class CreateQuarterlyGoals < ActiveRecord::Migration
  def change
    create_table :quarterly_goals do |t|
      t.boolean :approved, default: false
      t.integer :approved_by_id
      t.integer :person_id
      t.integer :site_id
      t.integer :quarter_id # year + 1/2/3/4, e.g. 20161 20162 20163 20164
      t.text :post_notes
      t.text :goals
      t.text :other_goals
      t.text :job_title_id

      t.timestamps null: false
    end
  end
end
