class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def set_csrf_cookie
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  def is_manager
    unless current_user.manager
      render nothing: true
      return
    end
  end

  def is_editor
    unless current_user.editor
      render nothing: true
      return
    end
  end

  def is_senior
    unless (current_user.manager || current_user.editor)
      render nothing: true
      return
    end
  end

  protected

  # In Rails 4.2 and above
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end
end
