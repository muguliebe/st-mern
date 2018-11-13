#!/usr/bin/env bash
export pgid = spawn 'sleep 20 | sleep 20'
sleep 1
Process.kill 'TERM', -$pgid
