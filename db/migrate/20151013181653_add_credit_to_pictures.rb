class AddCreditToPictures < ActiveRecord::Migration
  def change
    add_column :pictures, :credit, :text
  end
end
