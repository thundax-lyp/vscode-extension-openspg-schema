#!/usr/bin/env bash


ts-node "$(pwd)/scripts/prepare.ts"

export CODE_TESTS_WORKSPACE="$(pwd)/test/testFixture"
