#!/bin/bash
PROJECTS="common,auth,user,friend,talk,share,story,navi"
LINK_COMMON="auth,user,friend,talk,story,navi"
LINK_AUTH="user,friend,talk"
LINK_USER="friend,talk"

function create_link {
  IFS=','
  for p in $1
  do
    (
    cd $p
    yarn link
    )
  done
}

function linking {
  IFS=','
  for p in $1
  do
    (
    #cd $p
    echo "react-native-kakao-sdk-$2"
    )
  done
}

function linking_example {
  (
  cd example

  IFS=','
  for p in $PROJECTS
  do
    yarn link "react-native-kakao-sdk-$p"
  done
  )
}

create_link $PROJECTS
linking $LINK_COMMON "common"
linking $LINK_AUTH "auth"
linking $LINK_USER "user"
linking_example
