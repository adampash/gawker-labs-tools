class QuarterlyGoalMailer < ApplicationMailer
  include Rails.application.routes.url_helpers
  include ActionView::Helpers::UrlHelper

  def reject(goal, rejected_by, message)
    @goal = goal
    @editors = goal.person.editors
    emails = @editors.map do |editor|
      editor.email
    end
    @rejected_by = rejected_by
    @message = message
    mail(
      to: emails.join(', '),
      from: rejected_by.email,
      subject: "Goal for #{ goal.person.name } needs attention",
      html: rejection_html(message, goal, rejected_by)
    )
  end


  def rejection_html(message, goal, rejected_by)
    "
      <p>
        #{ rejected_by.name } said:
      </p>
      <p>
        #{ message }
      </p>
      <p>
        Update #{ goal.person.name }'s goal <a href=\"#{ edit_api_site_goal_url(goal.site.lower_name, goal.id) }\">here</a>
      </p>
    "
  end
end
