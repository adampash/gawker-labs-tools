class CreateJobTitles < ActiveRecord::Migration
  def change
    create_table :job_titles do |t|
      t.text :name
      t.integer :position

      t.timestamps null: false
    end
  end
end
