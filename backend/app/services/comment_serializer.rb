class CommentSerializer
  def initialize(comment_object)
    @comments = comment_object
  end

  def render_comment
    options = {
      :include => {
        :user => {:only => [:id, :username, :is_admin]},
        :post => {:only => [:id, :subject]}
      },
      :except => [:updated_at]
    }
    @comments.to_json(options)
  end
end