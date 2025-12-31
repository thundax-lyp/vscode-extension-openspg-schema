#!/usr/bin/env bash

export CODE_TESTS_PATH="$(pwd)/client/dist/test"
export CODE_TESTS_WORKSPACE="$(pwd)/client/testFixture"

# reset user-data-dir to make path shorter
export CODE_TESTS_USER_DATA_DIR="$(pwd)/../user-data/"

node "$(pwd)/client/dist/test/runTest"
