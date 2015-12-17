class Site < ActiveRecord::Base
  has_many :writers

  def lower_name
    name.downcase
  end
end
