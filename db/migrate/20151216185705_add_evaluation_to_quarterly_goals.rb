class AddEvaluationToQuarterlyGoals < ActiveRecord::Migration
  def change
    add_column :quarterly_goals, :evaluation, :text
  end
end
