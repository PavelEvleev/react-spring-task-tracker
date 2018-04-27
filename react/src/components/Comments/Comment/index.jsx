import React from 'react'

export default class Comment extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      editOpen: false,
      textComment: ''
    }
  }
  componentDidMount() {
    this.setState({ textComment: this.props.comment.text })
  }

  changeComment = () => {
    let comment = Object.assign({}, this.props.comment, { text: this.state.textComment });
    console.log(comment)
    console.log(this.state.textComment)
    // comment.text = this.state.textComment
    this.props.changeComment(comment)
    setTimeout(this.commentViewAction(), 2500)
  }

  deleteComment = () => {
    this.props.deleteComment(this.props.comment.id)
  }

  commentViewAction = () => {
    this.setState({ editOpen: !this.state.editOpen, textComment: !this.state.editOpen ? this.props.comment.text : '' })
  }
  changeCommentEvent = (e) => {
    this.setState({ textComment: e.target.value })
  }

  editView = () => {
    return (
      <div>
        <textarea cols="30" rows="10" value={this.state.textComment} onChange={this.changeCommentEvent} />
        <button onClick={this.changeComment}>Применить</button> <button onClick={this.commentViewAction}>Отменить</button>
      </div>
    )
  }
  dateToISO8601 = (date) => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  displayComment = () => {
    const { logined, comment } = this.props
    const { text, author } = comment
    return (
      <div><p>{text ? text : "Comment will be is here......"}</p>
        {
          (logined.id === author.id && logined.role.role === author.role.role) ?
            <div> <button onClick={this.commentViewAction}>Изменить</button> <button onClick={this.deleteComment}>Удалить</button></div>
            : ''
        }
      </div>)
  }

  render() {
    const { author, date, text } = this.props.comment
    return (
      <div style={{ border: "1px solid", backgroundColor: "grey", marginTop: "5px" }}>
        <div>
          <div>{author ? author.name : "Author comment is here"}</div>
          <div>{this.dateToISO8601(date)}</div>
        </div>
        {
          this.state.editOpen ? this.editView() : this.displayComment()
        }
      </div>

    )
  }
}
