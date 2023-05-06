import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    
    let {title ,description , imageUrl , newsUrl ,publishedAt ,author ,source} =this.props;
    
    return (
      <div className='my-3'>
      <div className="card" style={{width:"18rem"}}>
      <div style={{display:'flex' , justifyContent:'flex-end',position:'absolute',right:'0'}}>
      <span class="  badge rounded-pill text-bg-danger" style={{left:'90%',zIndex:'1' }}>{source}</span>

      </div>
  <img alt="check internet" src={imageUrl} className="card-img-top" />
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(publishedAt).toGMTString()}</small></p>
    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div></div>
    )
  }
}

export default NewsItem