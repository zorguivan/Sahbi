CREATE SCHEMA IF NOT EXISTS keeper;

USE keeper;

CREATE TABLE `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(15) DEFAULT NULL,
  `text` longtext,
  `project_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id_idx` (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;



INSERT INTO `notes` VALUES (1,'1472252400000','test1',1),(2,'1472166000000','test2',1),(3,'1472079600000','test3',1),(4,'1471993200000','test4',1),(5,'1471906800000','test5',1);



CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;


INSERT INTO `projects` VALUES (1,'Test  project');


CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(15) DEFAULT NULL,
  `start_time` varchar(5) DEFAULT NULL,
  `end_time` varchar(5) DEFAULT NULL,
  `hours` varchar(5) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `project_id_idx` (`project_id`),
  CONSTRAINT `project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `todos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `project_id` INT(11) NULL,
  `name` VARCHAR(85) NOT NULL,
  `description` MEDIUMTEXT NULL,
  `repeat` INT(1) NULL,
  `date` VARCHAR(15) NULL,
  `end_date` VARCHAR(15) NULL,
  PRIMARY KEY (`id`, `name`));

ALTER TABLE `keeper`.`todos`
ADD COLUMN `week` VARCHAR(2) NULL AFTER `end_date`;

ALTER TABLE `keeper`.`todos`
ADD COLUMN `day` VARCHAR(10) NULL AFTER `week`;


CREATE TABLE `keeper`.`todotracker` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `todo_id` INT(20) NULL,
  `start_range` VARCHAR(45) NULL,
  `end_range` VARCHAR(45) NULL,
  `state` INT(1) NULL,
  PRIMARY KEY (`id`));
