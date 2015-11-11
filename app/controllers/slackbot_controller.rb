require 'googler'
require 'slack-notifier'
TOKENS = ENV["SLACK_TOKEN"].split(",")

class SlackbotController < ApplicationController
  protect_from_forgery :except => :handle
  def handle
    return render nothing: true if !TOKENS.include? params[:token]
    username = "SlackBot"
    case params[:command]
    when '/google'
      response = Googler.search_and_format(params[:text])
      username = "Google results for *#{params[:text]}*"
      icon_emoji = ":rainbow:"
      channel = params[:channel_id]
      text = "https://www.google.com/#q=#{params[:text]}"
    when '/image'
      response = text = Googler.image_search(params[:text])
      username = "Google image result for *#{params[:text]}*"
      icon_emoji = ":camera:"
      channel = params[:channel_id]
    when '/style'
      if params[:text] == ''
        response = Style.usage_guide
      else
        response = Style.find_and_format(params[:text], params[:user_name])
      end
      username = "StyleBot"
      icon_emoji = ":penguin:"
      channel = params[:channel_id]
    end
    Slack::Notifier.new(
      ENV["SLACK_WEBHOOK_URL"],
      channel: channel,
      username: username,
      icon_emoji: icon_emoji,
    ).ping(text || "", attachments: response)
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
