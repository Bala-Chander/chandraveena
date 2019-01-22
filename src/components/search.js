import React from 'react'
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import { Link } from 'gatsby'
import {Container, Outer} from "./containers"
import Masthead from "./masthead"
import Footer from "./footer"
import AlgoliaIcon from "../../images/algolia.svg"
import {Inlineimg} from "./icons"
import styled from "styled-components"

const AlgoliaDiv = styled.div`
  a {
    text-decoration: none;
    color: #3369e7;
  }
  text-align: right;
  font-size: small;
`

const Searchwrapper = styled.div`
  input {
    display: inline-block;
    width: 80%;
  };
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  };
  .ais-SearchBox {
    margin: 0;
    padding: 0;
    text-align: center;
  };
  .ais-SearchBox-form {
    margin-bottom: 0.5rem;
  };
  .ais-SearchBox-submit, .ais-SearchBox-reset {
    background: #859e6b;
    border: 0;
    border-radius: 0.2rem;
    margin: 0 0 0 0.2rem;
    padding: 0.2rem;
  };
  .ais-SearchBox-submitIcon {
    stroke: #ffffff;
    fill: #ffffff;
    height: 1.2em;
    width: 1.2em;
    position: relative;
    top: 0.2em;
  };
  .ais-SearchBox-resetIcon {
    stroke: #859e6b;
    fill: #ffffff;
    height: 1.2em;
    width: 1.2em;
    position: relative;
    top: 0.2em;
  };
`

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

const Hit = ({hit}) => {
  return (
    <>
      <hr />
      <Link to={hit.fields.slug}><h3>{hit.frontmatter.title}</h3></Link>
      <small><Highlight hit={hit} attribute="value" tagName="mark" />
      ..<Link to={hit.fields.slug}>Read more</Link></small>
    </>
  )
}

export default () => (
  <Outer>
    <Masthead />
    <Container>
      <Searchwrapper>
        <InstantSearch searchClient={searchClient} indexName="CHANDRAVEENA">
          <SearchBox autoFocus />
          <AlgoliaDiv>
            Powered by <a href="https://www.algolia.com/">
            <Inlineimg src={AlgoliaIcon} /> Algolia</a>
          </AlgoliaDiv>
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </Searchwrapper>
    </Container>
    <Footer />
  </Outer>
)
