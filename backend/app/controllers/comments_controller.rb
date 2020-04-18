class CommentsController < ApplicationController
  def show
    @comment = Comment.find_by(id: params[:id])
    if @comment
      render json: CommentSerializer.new(@comment).render_comment
    else
      render json: {message: "Comment not found"}, status: :not_found
    end
  end

  def create
    @comment = Comment.find_by(comment_params)
    @comment.update(user: current_user)
    if @comment.save
      render json: CommentSerializer.new(@comment).render_comment
    else
      render json: {message: @comment.error}, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:subject, :content, :post_id)
  end
end
