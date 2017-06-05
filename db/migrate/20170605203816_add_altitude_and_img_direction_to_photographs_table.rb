class AddAltitudeAndImgDirectionToPhotographsTable < ActiveRecord::Migration
  def change
    add_column :photographs, :altitude, :string
    add_column :photographs, :image_direction, :string
  end
end
