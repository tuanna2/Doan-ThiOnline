-- tao database
CREATE SCHEMA `ThiOnline` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;

--tao bang users
CREATE TABLE `ThiOnline`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(255) NULL,
  `category_followed` VARCHAR(20) NULL,
  `sex` VARCHAR(10) NULL,
  `phone` VARCHAR(20) NULL,
  `introduction` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);
  
INSERT INTO `ThiOnline`.`users` (`id`, `username`, `email`, `password`) VALUES ('1', 'Administrator', 'admin', '$2y$12$cZrofhendcr3xwoWp0DIselAt17yqNbQmzJIZf5uK7h2Ub5JDanFu');

--table category
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `category` VALUES (1,'Đại học'),(2,'THCS & THPT'),(3,'Lập trình'),(4,'Chuyên môn'),(5,'Tiếng Anh'),(6,'Ngôn ngữ khác'),(7,'Kiến thức xã hội');


--table tag
CREATE TABLE `ThiOnline`.`tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `id_category` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_category_idx` (`id_category` ASC) VISIBLE,
  CONSTRAINT `fk_category`
  FOREIGN KEY (`id_category`)
  REFERENCES `ThiOnline`.`category` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

);

INSERT INTO `tag` VALUES (1,'Chính trị đại cương',1),(2,'Tư tưởng HCM',1),(3,'Đường lối ĐCS',1),(4,'Toán PTQG',2),(5,'Lý PTQG',2),(6,'Hoá PTQG',2),(7,'Javascript',3),(8,'Cơ sở dữ liệu',3),(9,'GMAT',4),(10,'IELTS',5),(11,'TOEIC',5),(12,'TOEFL',5),(13,'Tiếng Nhật',6),(14,'Tiếng Hàn',6),(15,'Tiếng Trung',6),(16,'Lịch Sử',7),(17,'Đố vui',7),(18,'Luật',7),(19,'Bằng lái xe',7);


--table tests
CREATE TABLE `ThiOnline`.`tests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `id_tag` INT(11) NOT NULL,
  `id_parent` INT(11) NOT NULL,
  `status` VARCHAR(10) NULL,
  `time` INT(10) NOT NULL,
  `created_at` DATE NOT NULL,
  `description` VARCHAR(255) NULL,
  `store` VARCHAR(1000) NULL,
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
  `question` VARCHAR(10000) NOT NULL,
  `A` VARCHAR(1000) NOT NULL,
  `B` VARCHAR(1000) NOT NULL,
  `C` VARCHAR(1000) NULL,
  `D` VARCHAR(1000) NULL,
  `E` VARCHAR(1000) NULL,
  `F` VARCHAR(1000) NULL,
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
  `point` VARCHAR(10) NOT NULL,
  `selected` VARCHAR(1000) NOT NULL,
  `submit_at` DATETIME NOT NULL,
  `time` INT(10) NOT NULL,
  `rules` varchar(1000) NOT NULL,
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

CREATE TABLE `ThiOnline`.`store` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question` VARCHAR(10000) NULL,
  `A` VARCHAR(1000) NOT NULL,
  `B` VARCHAR(1000) NOT NULL,
  `C` VARCHAR(1000) NULL,
  `D` VARCHAR(1000) NULL,
  `E` VARCHAR(1000) NULL,
  `F` VARCHAR(1000) NULL,
  `correct` VARCHAR(5) NOT NULL,
  `level` VARCHAR(5) NOT NULL,
  `tag_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tag_idx` (`tag_id` ASC) VISIBLE,
  CONSTRAINT `fk_tagg`
    FOREIGN KEY (`tag_id`)
    REFERENCES `ThiOnline`.`tag` (`id`)
    ON DELETE CASCADE 
    ON UPDATE CASCADE);
