class AddDateTimeDigitizedToPhotographsTable < ActiveRecord::Migration
  def change
    add_column :photographs, :datetime_digitized, :datetime
  end
end
