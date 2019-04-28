-- tao database
CREATE SCHEMA `ThiOnline` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;

--tao bang users
CREATE TABLE `ThiOnline`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `avatar` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

--table category
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `category` VALUES (1,'Đại học'),(2,'Phát triển phần mềm'),(3,'Ngôn ngữ khác'),(4,'THCS & THPT'),(5,'Bằng chuyên môn'),(6,'Bằng Anh văn'),(7,'Kiến thức xã hội');


--table tag
CREATE TABLE `ThiOnline`.`tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `id_category` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) 

ALTER TABLE `ThiOnline`.`tag` 
ADD INDEX `fk_category_idx` (`id_category` ASC) VISIBLE;
;
ALTER TABLE `ThiOnline`.`tag` 
ADD CONSTRAINT `fk_category`
  FOREIGN KEY (`id_category`)
  REFERENCES `ThiOnline`.`category` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


--table tests
CREATE TABLE `ThiOnline`.`tests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `id_tag` INT(11) NOT NULL,
  `id_parent` INT(11) NOT NULL,
  `permission` VARCHAR(10) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_tag_idx` (`id_tag` ASC) VISIBLE,
  INDEX `fk_parent_idx` (`id_parent` ASC) VISIBLE,
  CONSTRAINT `fk_tag`
    FOREIGN KEY (`id_tag`)
    REFERENCES `ThiOnline`.`tag` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_parent`
    FOREIGN KEY (`id_parent`)
    REFERENCES `ThiOnline`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

--table questions
CREATE TABLE `ThiOnline`.`questions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(1000) NOT NULL,
  `A` VARCHAR(255) NOT NULL,
  `B` VARCHAR(255) NOT NULL,
  `C` VARCHAR(255) NULL,
  `D` VARCHAR(255) NULL,
  `correct` VARCHAR(5) NULL,
  `id_test` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_test_idx` (`id_test` ASC) VISIBLE,
  CONSTRAINT `fk_test`
    FOREIGN KEY (`id_test`)
    REFERENCES `ThiOnline`.`tests` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

--table saveds
CREATE TABLE `ThiOnline`.`saved` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user` INT(11) NOT NULL,
  `id_test` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_saveUser_idx` (`id_user` ASC) VISIBLE,
  INDEX `fk_saveTest_idx` (`id_test` ASC) VISIBLE,
  CONSTRAINT `fk_saveUser`
    FOREIGN KEY (`id_user`)
    REFERENCES `ThiOnline`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_saveTest`
    FOREIGN KEY (`id_test`)
    REFERENCES `ThiOnline`.`tests` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

--table history
CREATE TABLE `ThiOnline`.`history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_test` INT(11) NOT NULL,
  `id_user` INT(11) NOT NULL,
  `true` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_historyTest_idx` (`id_test` ASC) VISIBLE,
  INDEX `fk_historyUser_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_historyTest`
    FOREIGN KEY (`id_test`)
    REFERENCES `ThiOnline`.`tests` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_historyUser`
    FOREIGN KEY (`id_user`)
    REFERENCES `ThiOnline`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


--table selected
CREATE TABLE `ThiOnline`.`selected` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_history` INT(11) NOT NULL,
  `id_question` INT(11) NOT NULL,
  `selected` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_history_idx` (`id_history` ASC) VISIBLE,
  INDEX `fk_question_idx` (`id_question` ASC) VISIBLE,
  CONSTRAINT `fk_history`
    FOREIGN KEY (`id_history`)
    REFERENCES `ThiOnline`.`history` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_question`
    FOREIGN KEY (`id_question`)
    REFERENCES `ThiOnline`.`questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

