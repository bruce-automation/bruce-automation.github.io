---
layout: default
title: "Articles"
description: "Blog SEO : guides, templates et systèmes pour acquérir du trafic et le monétiser."
permalink: /
lang: fr
---

<section class="blog">
  <header class="blog__head">
    <h1 class="h1">Articles</h1>
    <p class="sub">Objectif : publier vite, rank sur le long-tail, analyser, puis monétiser (affiliation → leads → produits).</p>
    <p style="margin-top:14px">
      <a class="btn" href="/blog/">Voir tous les articles</a>
      <span style="display:inline-block; width:10px"></span>
      <a class="btn2" href="/start-here/">Start here</a>
    </p>
  </header>

  <div class="blog__grid">
    {% assign latest = site.posts | slice: 0, 8 %}
    {% for post in latest %}
      <article class="postCard">
        <h2 class="postCard__title"><a class="link" href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="postCard__meta"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time></p>
        {% if post.description %}<p class="mut">{{ post.description }}</p>{% endif %}
        <p style="margin:14px 0 0"><a class="btn2" href="{{ post.url | relative_url }}">Lire →</a></p>
      </article>
    {% endfor %}
  </div>

  <div class="blog__footer">
    <p class="mut">RSS: <a class="link" href="{{ '/feed.xml' | relative_url }}">/feed.xml</a> · Sitemap: <a class="link" href="{{ '/sitemap.xml' | relative_url }}">/sitemap.xml</a></p>
  </div>
</section>
