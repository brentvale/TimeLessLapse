class AddOrderNumberToPhotographs < ActiveRecord::Migration
  def change
    add_column :photographs, :order_number, :integer
  end
end
