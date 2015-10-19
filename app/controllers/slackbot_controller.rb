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
      username = "Google results for *#{params[:text]}*"
      icon_emoji = ":rainbow:"
      channel = get_channel(params)
      puts "CHANNEL: #{channel}"
    end
    notifier = Slack::Notifier.new(
      ENV["SLACK_WEBHOOK_URL"],
      channel: channel,
      username: username,
      icon_emoji: icon_emoji,
    )
    notifier.ping "", attachments: response
    render nothing: true
  end

  protected
  def get_channel(params)
    if params[:channel_name] == 'directmessage'
      "@#{params[:user_name]}"
    else
      "##{params[:channel_name]}"
    end
  end
end
