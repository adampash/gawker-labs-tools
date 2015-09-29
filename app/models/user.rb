class User < ActiveRecord::Base
  has_many :galleries
  has_many :embeds
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable,
    :omniauthable, :omniauth_providers => [:google_oauth2]

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

end
