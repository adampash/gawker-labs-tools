require 'reverse_markdown'
require 'slack-notifier'

class Style < ActiveRecord::Base
  searchkick

  def self.find_and_format(query, username)
    style = get_rule(query)
    if style
      style.format_rule(query)
    else
      notify_style_misses(query, username)
      [{
        fallback: "No rule found for \"#{query}\"",
        pretext: "No rule found for \"#{query}\"",
        text: "You may want to try another spelling",
        color: "#F7F7F7",
      }]
    end
  end

  def self.notify_style_misses(query, username)
    notifier = Slack::Notifier.new(
      ENV["SLACK_WEBHOOK_URL"],
      channel: '#style-misses',
      username: "StyleBot",
      icon_emoji: ':penguin:',
    )
    notifier.ping "A style rule not found: #{username} searched for #{query}"
  end

  def self.get_rule(query)
    search(query, limit: 1).first
  end

  def format_rule(query)
    [{
      fallback: "*#{rule}* #{details}",
      title: rule,
      pretext: "Style rule for \"#{query}\"",
      text: details,
      color: "#F7F7F7",
    }]
  end
end
