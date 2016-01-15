class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    if User.whitelisted? request.env["omniauth.auth"]["info"]["email"]
      @user = User.from_omniauth(request.env["omniauth.auth"])

      if @user.persisted?
        flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"
        sign_in_and_redirect @user, :event => :authentication
      else
        session["devise.google_data"] = request.env["omniauth.auth"]
        redirect_to new_user_registration_url
      end
    else
      flash[:alert] = "You need to log in with your Gawker Media account"
      redirect_to root_path
    end
  end
end
