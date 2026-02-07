---
layout: default
title: "Articles"
description: "Practical notes on AI, AI agents, and building reliable systems."
permalink: /
lang: en
---

<section class="blog">
  <header class="blog__head">
    <h1 class="h1">AI Agents Notes</h1>
    <p class="sub">Practical notes on AI agents: architecture, reliability, tooling, and operations.</p>

    <div class="card" style="margin-top:16px">
      <h2 style="margin:0 0 8px">Start here</h2>
      <p class="mut" style="margin:0 0 12px">If you’re new: follow a short reading path.</p>
      <ol style="margin:0; padding-left: 1.1em">
        <li><a class="link" href="/blog/guides/minimal-ai-agent-architecture/">Minimal production-ready architecture</a></li>
        <li><a class="link" href="/blog/tutorials/ai-agent-reliability-guardrails/">Reliability guardrails + logs</a></li>
        <li><a class="link" href="/blog/templates/seo-article-brief-checklist/">SEO article brief checklist</a></li>
      </ol>
      <p style="margin:14px 0 0">
        <a class="btn" href="/start-here/">Start here</a>
        <span style="display:inline-block; width:10px"></span>
        <a class="btn2" href="/blog/">Browse all</a>
      </p>
    </div>
  </header>

  <div class="blog__grid">
    {% assign latest = site.posts | slice: 0, 8 %}
    {% for post in latest %}
      <article class="postCard">
        <h2 class="postCard__title"><a class="link" href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="postCard__meta"><time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%Y-%m-%d" }}</time></p>
        {% if post.description %}<p class="mut">{{ post.description }}</p>{% endif %}
        <p style="margin:14px 0 0"><a class="btn2" href="{{ post.url | relative_url }}">Read →</a></p>
      </article>
    {% endfor %}
  </div>

  <div class="blog__footer">
    <p class="mut">RSS: <a class="link" href="{{ '/feed.xml' | relative_url }}">/feed.xml</a> · Sitemap: <a class="link" href="{{ '/sitemap.xml' | relative_url }}">/sitemap.xml</a></p>
  </div>
</section>
