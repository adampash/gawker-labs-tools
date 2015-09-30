class AddNameToEmbeds < ActiveRecord::Migration
  def change
    add_column :embeds, :name, :text
  end
end
