require 'google-search'
require 'reverse_markdown'
require 'htmlentities'

ReverseMarkdown.config do |config|
  config.github_flavored  = true
end

module Googler
  def self.search(query)
    search = Google::Search::Web.new(
      query: query,
      size: :small,
      rsz: 4,
    )
    search.get_response.hash["responseData"]["results"]
  end

  def self.search_and_format(query)
    format(
      clean(
        search(query)
      )
    )
  end

  def self.clean(results)
    coder = HTMLEntities.new
    results.map do |result|
      result.keys.map do |key|
        result[key] = coder.decode(result[key])
      end
      result
    end
  end

  def self.format(results, count=4)
    puts results
    results[0...4].map do |result|
      {
        fallback: "[#{result["titleNoFormatting"]}](#{result["url"]})",
        title: result["titleNoFormatting"],
        title_link: result["url"],
        # pretext: result.visible_uri,
        text: ReverseMarkdown.convert(result["content"]).gsub('**', '*'),
        color: "#F7F7F7",
        fields: [{
          value: "<#{result["url"]}|#{result["visibleUrl"]}>",
        }],
      }
    end
  end
end
