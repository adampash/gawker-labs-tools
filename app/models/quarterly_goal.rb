class QuarterlyGoal < ActiveRecord::Base
  belongs_to :site
  belongs_to :quarter
  belongs_to :job_title
  belongs_to :person, class_name: "User"
  belongs_to :approved_by, class_name: "User"

  def self.create_from_params(options)
    puts options
    quarter = Quarter.find_by(q_id: options[:quarter])
    site = Site.find_by(name: options[:siteName].titlecase)
    create(
      person_id: options["person"]["id"],
      job_title_id: options["title"]["id"],
      quarter_id: quarter.id,
      site_id: site.id,
      goals: options["goals"],
      other_goals: options["other_goals"],
    )
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
  end

  def previous_quarter_id
    case quarter.q_id.to_s.last
    when "2", "3", "4"
      quarter.q_id + 1
    else
      quarter.q_id - 7
    end
  end

  def previous_quarter
    Quarter.find_by(q_id: previous_quarter_id)
  end

  def previous_goal
    QuarterlyGoal.find_by(
      quarter_id: previous_quarter.id,
      person_id: person_id
    )
  end

  def last_q_evaluation

  end

  def as_json(options=nil)
    json = super
    json["person"] = person
    json["job"] = job_title
    json["quarter"] = quarter
    json
  end

end
