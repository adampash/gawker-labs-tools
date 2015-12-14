class QuarterlyGoal < ActiveRecord::Base
  belongs_to :site
  belongs_to :quarter
  belongs_to :person, class_name: "User"
  belongs_to :approved_by, class_name: "User"

  def self.create_from_params(options)
    puts options
    quarter = Quarter.find_by(q_id: options[:quarter])
    site = Site.find_by(name: options[:siteName].titlecase)
    create(
      person_id: 1,
      quarter_id: quarter.id,
      site_id: site.id,
      goals: options["goals"],
      other_goals: options["otherGoals"],
    )
  end

  def self.by_site_and_quarter(site_name, q_id)
    site = Site.find_by(name: site_name.titlecase)
    quarter = Quarter.find_by(q_id: q_id)
    where(site_id: site.id).where(quarter_id: quarter.id)
  end

  def as_json(options=nil)
    json = super
    json["person"] = person
    json
  end

end
