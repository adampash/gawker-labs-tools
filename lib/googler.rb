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
    results[0...4].map do |result|
      {
        fallback: "[#{result.title}](#{result.uri})",
        title: result.title,
        title_link: result.uri,
        # pretext: result.visible_uri,
        text: ReverseMarkdown.convert(result.content).gsub('**', '*'),
        color: "#F7F7F7",
        fields: [{
          value: "<#{result.uri}|#{result.visible_uri}>",
        }],
      }
    end
  end
end
