import React from 'react'
import Comment from './Comment/index'
import AddComment from './AddComment/index'


export default class Comments extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      comments: []
    }
  }
  componentDidMount() {
    console.log(this.props.comments)
  }

  printComments = () => {
    console.log(this.props.comments)
    const { comments, logined } = this.props
    return comments ? comments.map(c => <Comment key={c.id} logined={logined} fetching={this.props.fetching} comment={c} changeComment={this.props.changeComment} deleteComment={this.props.deleteComment} />) : ''
  }

  render() {
    return (
      <div>
        <span>cтраница:{this.props.comments.number + 1} из {this.props.comments.totalPages}</span>
        {this.printComments()}
        <AddComment createComment={this.props.createComment} />
      </div>
    )
  }
}
