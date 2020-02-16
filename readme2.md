## 사용자등록
### 1. root 관리자 등록
mongo demon 생성
~~~bash
# DB를 위한 node 폴더 생성후
mongod --port 15000 --dbpath C:\MongoDB\node
~~~
mongo shell 접속
~~~bash
mongo --port 15000
~~~
mongo shell에서 계정생성
~~~shell script
# 전체 DB 관리계정 생성
use admin
db.createUser({
    user: "root",
    pwd: "000000",
    roles: ["dbAdminAnyDatabase"]
});

# 특정 DB(node)에만 접근 가능한 계정생성
use node
db.createUser({
    user: "node",
    pwd: "000000",
    roles: ["readWrite", "userAdmin"]
});

# 계정지우기
use node
db.dropUser("node");
~~~
auth 옵션(접속권한 요구)으로 mongo demon 재생성
auth 옵션을 넣으면 username/password 필요
~~~bash
mongod --port 15000 --dbpath C:\MongoDB\node --auth
~~~
생성된 계정으로 mongo shell 접속
~~~bash
mongo --port 15000 -u root -p
000000 #엔터치면 비밀번호 요구
~~~
특정 DB에만 접근 가능한 계정은 DB명도 기입
Compass로 접속시, Authentication Database명까지 기입해야함

auth 옵션으로 생성된 demon에 root로 접속하면, 계정생성은 안됨
root에 계정생성권한을 추가해야 한다.