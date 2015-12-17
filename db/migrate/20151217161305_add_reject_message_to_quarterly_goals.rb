class AddRejectMessageToQuarterlyGoals < ActiveRecord::Migration
  def change
    add_column :quarterly_goals, :reject_message, :text
  end
end
