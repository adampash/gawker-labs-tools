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
      h = {}
      result.keys.map do |key|
        h[key] = coder.decode(result[key])
      end
      h
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
        text: ReverseMarkdown.convert(result["content"]).gsub('**', '*').gsub("&nbsp;", ''),
        color: "#F7F7F7",
        fields: [{
          value: "<#{result["url"]}|#{result["visibleUrl"]}>",
        }],
      }
    end
  end

  def self.image_search(query)
    search = Google::Search::Image.new(
      query: query,
      size: :small,
      rsz: 4,
    )
    results = search.get_response.hash["responseData"]["results"]
    if results
      img = results.sample["url"]
    else
      img = "No image found"
    end
    img
  end

end
