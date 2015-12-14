class Quarter < ActiveRecord::Base
  def self.initiate_quarters
    q_name
    latest = Quarter.find_by(name: q_name)
    if latest.nil?
      Quarter.create(name: q_name, q_id: q_id)
    end
  end

  def self.q_name
    "Q#{(next_quarter.month/3.0).ceil} #{next_quarter.year}"
  end

  def self.next_quarter
    Time.now + 1.month
  end

  def self.q_id
    "#{next_quarter.year}#{(next_quarter.month/3.0).ceil}".to_i
  end
end
