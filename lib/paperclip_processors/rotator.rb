module Paperclip
  class Rotator < Thumbnail
    def transformation_command
      if rotate_command
         rotate_command + super.join(' ')
      else
        super
      end
    end

    def rotate_command
      target = @attachment.instance
      if target.rotate.present?
        " -rotate #{target.rotate} "
      end
    end
  end
end