require 'googler'
require 'slack-notifier'

class SlackbotController < ApplicationController
  protect_from_forgery :except => :handle
  def handle
    render nothing: true if params[:token] != ENV["SLACK_TOKEN"]
    username = "SlackBot"
    case params[:command]
    when '/google'
      response = Googler.search_and_format(params[:text])
      puts response
      username = "SearchBot"
    end
    notifier = Slack::Notifier.new(
      ENV["SLACK_WEBHOOK_URL"],
      channel: '@adampash',
      username: "Google results for *#{params[:text]}*"
    )
    notifier.ping "", attachments: response
    render nothing: true
  end
end
