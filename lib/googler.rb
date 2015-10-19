require 'google-search'
require 'reverse_markdown'

ReverseMarkdown.config do |config|
  config.github_flavored  = true
end

module Googler
  def self.search(query)
    Google::Search::Web.new(query: query, size: :small, rsz: 4)
  end

  def self.search_and_format(query)
    format(
      search(query)
    )
  end

  def self.format(results, count=4)
    formatted = results.map do |result|
      # {
      #   title: result.title,
      #   url: result.uri,
      #   content: result.content,
      #   display_url: result.visible_uri,
      # }
      {
        fallback: "[#{result.title}](#{result.uri})",
        title: result.title,
        title_link: result.uri,
        # pretext: result.visible_uri,
        text: ReverseMarkdown.convert(result.content).gsub('**', '*'),
        color: "good"
      }
    end
    formatted[0...5]
  end
end
