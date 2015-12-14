class Quarter < ActiveRecord::Base
  def self.initiate_quarters
    q_name
    latest = Quarter.find_by(name: q_name)
    if latest.nil?
      Quarter.create(name: q_name, q_id: q_id)
    end
  end

  def self.q_name
    "Q#{(Time.now.month/3.0).ceil} #{Time.now.year}"
  end

  def self.q_id
    "#{Time.now.year}#{(Time.now.month/3.0).ceil}".to_i
  end
end
