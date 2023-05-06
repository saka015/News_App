import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { Spinner } from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar'

export class News extends Component {

  articles=[
    {
    "source": {
    "id": null,
    "name": "Deadline"
    },
    "author": "Armando Tinoco",
    "title": "‘Joker: Folie À Deux’: First Look Of Lady Gaga In Character With Joaquin Phoenix - Deadline",
    "description": "Director Todd Phillips unveiled the first look at Lady Gaga in character for the film Joker: Folie à deux. “Happy Valentines Day,” Phillips captioned the image on Instagram. In the phot…",
    "url": "https://deadline.com/2023/02/joker-folie-a-deux-first-look-lady-gaga-character-joaquin-phoenix-1235260215/",
    "urlToImage": "https://deadline.com/wp-content/uploads/2023/02/Lady-Gaga.jpg?w=1000",
    "publishedAt": "2023-02-15T02:18:00Z",
    "content": "Director Todd Phillips unveiled the first look at Lady Gaga in character for the film Joker: Folie à deux.\r\n“Happy Valentines Day,” Phillips captioned the image on Instagram.\r\nIn the photo, Gaga is p… [+1354 chars]"
    },
    {
    "source": {
    "id": "cnn",
    "name": "CNN"
    },
    "author": "Clare Foran, Ali Zaslav, Ted Barrett",
    "title": "Dianne Feinstein announces she won't run for reelection in 2024 - CNN",
    "description": "Democratic Sen. Dianne Feinstein announced on Tuesday that she will not run for reelection in 2024, a major moment for a historic political career as the fight to succeed her is already under way.",
    "url": "https://www.cnn.com/2023/02/14/politics/dianne-feinstein-reelection-not-running/index.html",
    "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/230214135512-01-dianne-feinstein-0213.jpg?c=16x9&q=w_800,c_fill",
    "publishedAt": "2023-02-15T01:20:00Z",
    "content": "Democratic Sen. Dianne Feinstein announced on Tuesday that she will not run for reelection in 2024, a major moment for a historic political career as the fight to succeed her is already under way.\r\nI… [+3218 chars]"
    },
    {
    "source": {
    "id": null,
    "name": "Page Six"
    },
    "author": "Nicki Cox",
    "title": "Marc Anthony, Nadia Ferreira expecting first child just weeks after their wedding - Page Six",
    "description": "Anthony, 54, and Ferreira, 23, announced that they are expecting their first child together on Tuesday — just weeks after they tied the knot.",
    "url": "https://pagesix.com/2023/02/14/marc-anthony-nadia-ferreira-expecting-first-child-just-weeks-after-their-wedding/",
    "urlToImage": "https://pagesix.com/wp-content/uploads/sites/3/2023/02/NYPICHPDPICT000006676029.jpg?quality=75&strip=all&w=1200",
    "publishedAt": "2023-02-15T00:59:00Z",
    "content": "Marc Anthony and Nadia Ferreira are already expanding their family.\r\nThe couple announced that they’re expecting their first child together his seventh just two weeks after saying “I do.”\r\n“Best Vale… [+1736 chars]"
    },
  ]

  static defaultProps = {
    country:'in',
    pageSize:6,
    category:'general',
  }

  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }

  constructor(props) {
    super(props);
    console.log("Ye chla constructor");

    this.state = {
      articles: this.articles,
      loading: true,
      page:1,
      totalResults:0
    };

    document.title = `${this.props.category} - Taja Khabar `
  }
  
  // async updateNews(pageNo){

  //   const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7c77e748f6c4b30a44323bba0fee9a2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});

  //   let data = await fetch(url);
  //   let parsedData= await data.json()
  //   console.log(parsedData)
  //   this.setState({articles:parsedData.articles ,
  //      totalResults: parsedData.totalResults,
  //     loading:false
  //   })
    
    
  // }

  async componentDidMount(){
    console.log("cdm chal gya")

    this.props.setProgress(10);

    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7c77e748f6c4b30a44323bba0fee9a2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});

    let data = await fetch(url);
    this.props.setProgress(30);

    let parsedData= await data.json()
    this.props.setProgress(70);

    console.log(parsedData)
    this.setState({articles:parsedData.articles ,
       totalResults: parsedData.totalResults,
      loading:false
    })

    this.props.setProgress(100);


    // this.updateNews()

  }

  handlePrevClick=async()=>{
    console.log("Prev")

    this.setState({loading:true});
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7c77e748f6c4b30a44323bba0fee9a2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`; 
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({articles:parsedData.articles})


    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    })
    // this.setState({page:this.state.page - 1})
    // this.updateNews()

    
  }

  handleNextClick= async()=>{
    console.log("Next")
    if(!( this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize))){
      this.setState({loading:true});
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7c77e748f6c4b30a44323bba0fee9a2&page=${this.state.page +1}&pageSize=${this.props.pageSize}`; 
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles:parsedData.articles})


    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading:false
    })
  }

  // this.setState({page:this.state.page + 1})
  // this.updateNews()

  }

     fetchMoreData=async()=>{
      this.setState({page:this.state.page +1})
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f7c77e748f6c4b30a44323bba0fee9a2&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData= await data.json()
    console.log(parsedData)
    this.setState({articles:this.state.articles.concat(parsedData.articles) ,
       totalResults: parsedData.totalResults
    })

    }

  render() {
    return (
      <div className="container my-3">
          <h2 className="text-center my-4">Taja Khabar - Top {this.props.category} Headlines</h2>
          {this.state.loading && <Spinner/>}
          
      <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !==this.state.totalResults}
        loader={<Spinner/>}
        >

       <div className="container">
       <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem  title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,80):""} imageUrl={element.urlToImage} newsUrl={element.url} publishedAt={element.publishedAt} author={element.author} source={element.source.name} />
              </div>
            );
          })}
        </div>

       </div>
        </InfiniteScroll>
        
      </div>
    );
  }
}

export default News;
