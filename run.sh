git add out/
git commit -m "Deploy to gh-pages"
git push origin --delete gh-pages
git subtree push --prefix out origin gh-pages