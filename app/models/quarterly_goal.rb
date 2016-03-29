class QuarterlyGoal < ActiveRecord::Base
  include ActionView::Helpers::TextHelper
  belongs_to :site
  belongs_to :quarter
  belongs_to :job_title
  belongs_to :person, class_name: "User"
  belongs_to :approved_by, class_name: "User"

  def self.create_from_params(options)
    puts options
    quarter = Quarter.find_by(q_id: options[:quarter])
    site = Site.find_by(name: options[:siteName].titlecase)
    goal = create(
      person_id: options["person"]["id"],
      job_title_id: options["title"]["id"],
      quarter_id: quarter.id,
      site_id: site.id,
      goals: options["goals"],
      other_goals: options["other_goals"],
    )
    if options[:last_q_evaluation]
      goal.previous_goal.update_attributes(
        evaluation: options[:last_q_evaluation],
        # evaluated_by_id: current_user.id,
      )
    end
    goal
  end

  def self.by_site_and_quarter(site_name, q_id)
    site = Site.find_by(name: site_name.titlecase)
    quarter = Quarter.find_by(q_id: q_id)
    where(site_id: site.id)
      .where(quarter_id: quarter.id)
      .order(approved: :desc)
  end

  def update_with_params(options)
    params = {
      goals: options[:goals],
      other_goals: options["other_goals"],
    }
    if options["title"]
      params[:job_title_id] = options["title"]["id"]
    end
    update_attributes(params)
    if options[:last_q_evaluation] && previous_goal
      previous_goal.update_attributes(
        evaluation: options[:last_q_evaluation],
        # evaluated_by_id: current_user.id,
      )
    end
  end

  def previous_quarter_id
    case quarter.q_id.to_s.last
    when "2", "3", "4"
      quarter.q_id - 1
    else
      quarter.q_id - 7
    end
  end

  def previous_quarter
    Quarter.find_by(q_id: previous_quarter_id)
  end

  def previous_goal
    if previous_quarter
      QuarterlyGoal.find_by(
        quarter_id: previous_quarter.id,
        person_id: person_id
      )
    else
      false
    end
  end

  def last_q_evaluation
    previous_goal ? previous_goal.evaluation : ''
  end

  def as_json(options=nil)
    json = super
    json["last_q_evaluation"] = last_q_evaluation
    json["person"] = person
    json["approved_by"] = approved_by
    json["job"] = job_title
    json["quarter"] = quarter
    json
  end

  def approve(user)
    update_attributes(
      approved_by_id: user.id,
      approved: true
    )
  end

  def reject(user, message)
    update_attributes(
      reject_message: message,
    )
    QuarterlyGoalMailer.reject(self, user, message).deliver
  end


  class Helper
    include Singleton
    include ::ActionView::Helpers::NumberHelper
  end

end
