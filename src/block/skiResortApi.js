/**
 * Gutenberg Custom Ski Resort Search API
 * 
 */

const { Component, Fragment } = wp.element;
const { TextControl } = wp.components;
import ReactHtmlParser from "react-html-parser";

export default class ResortApi extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            results: {},
            searchInput: '',
            loading: false
        }
    }
    searchApi = async (query) => {
        try {
            if (!query) {
                this.setState({
                    results: '',
                    searchInput: '',
                    loading: false,
                });
                return false;
            }
            //user input will assign here
            this.setState({
                searchInput: query,
            });

            const baseUrl = 'https://api.fnugg.no/';
            const response = await fetch(`${baseUrl}search?q=${query}`);
            const data = await response.json();
            this.setState({ results: data, error: false, loading: true });

            //Search result called here when the user search 
            setTimeout(() => {
                this.searchResult();
            }, 500);

        } catch (error) {
            this.setState({ error })
        }

    }
    inputField = () => {
        return (
            <TextControl
                value={this.state.searchInput}
                onChange={(newVal) => this.searchApi(newVal)}
                placeholder="Search Resort Name"
            />
        )
    }
    searchResult = () => {
        const { setAttributes } = this.props;
        let result = this.state.results;
        if (result &&
            result.hits &&
            result.hits.hits &&
            result.hits.hits[0] &&
            result.hits.hits[0]._source
        ) {
            let source = result.hits.hits[0]._source;
            let html = `<div class="resort-wrapper">
                            <div class="resort-pic-wrapper">
                                <h2 class="resort-title">${source.name}</h2>
                                <img class="resort-pic" src=${source.images.image_1_1_l} alt=${source.name} />
                                <p class="resort-weather"><span class="forhold">Dagens Forhold</span class="updated">Oppdatert: ${source.last_updated}</p>
                            </div>
                            <div class="resort-description">
                                <p class="resort-cloud"><span>Oversyket </span> <span class="temp">${source.conditions.forecast.today.top.temperature.maxTemperature} &#8451;</span><p>
                                <p class="resort-wind"><span>Så og si vindstille</span> <span>${source.conditions.forecast.today.top.wind.mps} m/s </span></p>
                            </div>
                        </div>`;
            // To save the data in the save function
            setAttributes({
                searchResult: html
            })
        } else {
            setAttributes({
                searchResult: ''
            })
        }
    }
    render() {
        const data = this.props;
        if (data.attributes.searchResult) {
            return (
                <Fragment>
                    {this.inputField()}
                    <Fragment>
                        {ReactHtmlParser(data.attributes.searchResult)}
                    </Fragment>
                </Fragment>
            )
        }
        return (
            <Fragment>
                {this.inputField()}
            </Fragment>
        );
    }
}