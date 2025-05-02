#!/bin/sh

# fetch latest updates from the remote
git fetch origin

# get the current branch name
current_branch=$(git symbolic-ref --short HEAD)

# check if the current branch is up to date with 'main'
if [[ $(git rev-list --left-right --count origin/main...$current_branch | awk '{print $1}') -gt 0 ]]; then
  printf "\n⚠️ Your branch is behind 'main'!\n"
  printf "📥 Please run 'git pull origin main' before committing.\n"
  printf "🔄 This ensures your changes are compatible with the latest codebase.\n"
  exit 1
fi

printf "\n✅ Branch is in sync with 'main' - ready to commit.\n"