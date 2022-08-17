import { Page } from '../Page';
import styles from './Home.module.scss'

export const Home = () => (
  <Page title="Sonic Breakbeat">
    <div className={styles.bioContainer}>
      <div className={styles.bioText}>
        <p>
          Sonic breakbeat bio
        </p>

        <h3 className="text-center">Track Spotlight:</h3>
        <div id="spotlightCarousel" className="carousel slide album-carousel" data-ride="carousel">
          {/* Indicators */}
          <ol className="carousel-indicators">
            {/* 
            {% assign counter = 0 %}
            {% assign active = " active" %}
            {% for t1 in site.data.track-spotlight %}
            {% assign s = t1 | split:"/" | last %}
            {% for song in site.pages %}
            {% if t1 contains "@album" and song.layout != "album" %}
            {% continue %}
            {% endif %}
            {% assign t2 = song.url | split:"/" | last | replace:".html","" %}
            {% if s == t2 %}
            {% if counter > 0 %}
            {% assign active = "" %}
            {% endif %}
            */}

            <li data-target="#spotlightCarousel" data-slide-to="{{counter}}" className="{{active}}"></li>

            {/*
            {% assign counter = counter | plus: 1 %}
            {% endif %}
            {% endfor %}
            {% endfor %}
            */}
          </ol>

          {/* Wrapper for slides */}
          <div className="carousel-inner">
            {/*
            {% assign counter = 0 %}
            {% assign active = " active" %}
            {% for t1 in site.data.track-spotlight %}
            {% assign s = t1 | split:"/" | last %}
            {% for song in site.pages %}
            {% if t1 contains "@album" and song.layout != "album" %}
            {% continue %}
            {% endif %}
            {% assign t2 = song.url | split:"/" | last | replace:".html","" %}
            {% if s == t2 %}
            {% if counter > 0 %}
            {% assign active = "" %}
            {% endif %}
          */}

            <div className="item{{active}}">
              <a href="{{song.url}}"><img src="/assets/images/songs/{{song.image}}" alt="{{song.title}}" /></a>
            </div>

            {/*
            {% assign counter = counter | plus: 1 %}
            {% endif %}
            {% endfor %}
            {% endfor %}
          */}
          </div>

          {/* Left and right controls */}
          <a className="left carousel-control" href="#spotlightCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#spotlightCarousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      <div className={styles.verticalDivider}></div>

      <div className={styles.spotifyBlurb + ' text-center'}>
        <h3>A good chunk of my music is now on Spotify!</h3>
        {/*% include spotify-follow.jekyll %*/}

        <br />
        <br />
        <h3>Latest Release:</h3>
        {//<iframe src="{{site.latest-spotify}}" width="290" height="380" frameBorder="0" allowTransparency={true} allow="encrypted-media"></iframe>
        }
      </div>
    </div>
  </Page>
);
