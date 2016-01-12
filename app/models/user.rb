class User < ActiveRecord::Base
  WHITELISTED_EMAILS = /^\w.*@(gawker|deadspin|jezebel|kotaku|lifehacker|jalopnik|io9|gizmodo)\.com$/
  has_many :galleries
  has_many :embeds
  has_many :quarterly_goals, foreign_key: :person_id
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable,
    :omniauthable, :omniauth_providers => [:google_oauth2]

  def self.whitelisted?(email)
    !email.match(WHITELISTED_EMAILS).nil?
  end

  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(:email => data["email"]).first

    # Uncomment the section below if you want users to be created if they don't exist
    unless user
      user = User.create(name: data["name"],
                         email: data["email"],
                         avatar: data["image"],
                         password: Devise.friendly_token[0,20]
                        )
    end
    user
  end

  def latest_galleries
    galleries.order(created_at: :desc).limit(10)
  end

  def latest_embeds
    embeds.order(created_at: :desc).limit(10)
  end

  def site
    email.match(/@(\w+)\.com/)[1]
  end

  def as_json(options=nil)
    json = super
    json["site"] = site
    json
  end

  def previous_goal(quarter_id)
    prev = previous_quarter(quarter_id)
    if prev
      quarterly_goals.find_by(quarter_id: prev.id)
    else
      nil
    end
  end

  def previous_quarter(quarter_id)
    Quarter.find_by(q_id: previous_quarter_id(quarter_id))
  end

  def previous_quarter_id(quarter_id)
    quarter = Quarter.find(quarter_id)
    case quarter.q_id.to_s.last
    when "2", "3", "4"
      quarter.q_id + 1
    else
      quarter.q_id - 7
    end
  end

  def editors
    User.where(editor: true).where(manager: true).select do |user|
      user.site == site
    end
  end

end
