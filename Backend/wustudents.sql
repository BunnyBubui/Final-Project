-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: wustudents
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(999) NOT NULL,
  PRIMARY KEY (`id`,`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (22,'67100784','$2b$10$fSaocy.WuhoAtCVJ6.j.t.uGepOkIXCr1Hzmv86VgQZ3cPLDw6A/6'),(23,'67133363','$2b$10$GwQYPYWscYud246vQNuPcuBd.lvu88giGVwrExZbHYPZy5Qt4igoC'),(24,'67100000','$2b$10$6UxAKoQy2MF8W7oRQ/u21uNxFKWQzyfhjjfTVA.zNC3.AIoE7k4f.'),(25,'67100001','$2b$10$izYf0jq07vxZozubKmckf.9s/U0PfX8tfMvrlT3zNjac25gloFokC'),(26,'12345678','$2b$10$GyO2nhHaq8TJtyRtPvwsLe.1RgPRVoqeo6lYwiZblOfuBD7LE7LBa'),(27,'6710000002','$2b$10$xjNHCCAt.QIUT56rE.r6oOoxBoVPFWcrhNewrghStxi1an2Zv12y2'),(28,'68100000','$2b$10$AwZ.mQIoDfg6el110ZrytOBuRh9ruWPqbDvVtcmMi2mq.sfUxbxte'),(29,'68100001','$2b$10$s4CXtFcakNM2Y.kG40GT8.C8MQ8eTKqGvirICszvdB08f1vMcoYG2'),(30,'68100002','$2b$10$8lfwYbMb282vJlTCbre8Q.ad5MnxjrxwQI1PNkV12MSU4LZ2H.qzK'),(31,'69100000','$2b$10$/nYfH6yYRbpIOfaVogeVmecRN46CpZL5m7Jf2sxIiia4VV0WzMX8S'),(32,'69100001','$2b$10$gZlYwOxeQIDk9T8VVqfn.OoGSw1g9XVyBkKNP3.QeWq4iZTpuiu1e');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `market`
--

DROP TABLE IF EXISTS `market`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `market` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `item_name` varchar(45) NOT NULL,
  `item_type` varchar(45) NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `create_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `market`
--

LOCK TABLES `market` WRITE;
/*!40000 ALTER TABLE `market` DISABLE KEYS */;
INSERT INTO `market` VALUES (5,'12345678','ddd','เครื่องเขียน',0,50,'2025-09-30 20:07:15'),(9,'12345678','ddd','รองเท้า',0,5,'2025-09-30 20:25:58'),(10,'12345678','ddd','เสื้อผ้า',0,50,'2025-09-30 20:26:08'),(11,'12345678','dd','ของทำมือ',0,5,'2025-09-30 20:33:47'),(12,'12345678','555','อุปกรณ์อิเล็กทรอนิกส์',0,55,'2025-09-30 20:33:53'),(13,'12345678','44','อื่นๆ',0,4,'2025-09-30 20:34:00'),(14,'12345678','dd','เสื้อผ้า',0,1,'2025-09-30 20:34:12'),(15,'12345678','dd','อาหาร',0,50,'2025-09-30 20:40:38'),(16,'12345678','111','อาหาร',0,50,'2025-09-30 20:40:43'),(17,'68100002','สายชาร์จ','อุปกรณ์อิเล็กทรอนิกส์',0,299,'2025-09-30 22:21:16'),(18,'68100002','ต้มยำนํ้าข้น','อาหาร',18,50,'2025-09-30 22:21:46'),(20,'69100001','ดินสอ','เครื่องเขียน',19,5,'2025-09-30 22:37:10'),(21,'69100001','ข้าวไข่เจียว','อาหาร',1,25,'2025-09-30 22:37:26');
/*!40000 ALTER TABLE `market` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`username`),
  KEY `username_idx` (`username`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `login` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'67100784','customer','0622071934'),(2,'67100000','customer','0622071934'),(3,'67100001','customer','0622071934'),(4,'12345678','worker','062207194'),(5,'6710000002','worker','0622071934'),(6,'68100001','customer','0622071934'),(7,'68100002','worker','1234567890'),(8,'69100000','customer','111111111'),(9,'69100001','worker','1234567890');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime NOT NULL,
  PRIMARY KEY (`id`,`username`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `username_idx` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES (28,'12345678','2025-09-30 21:37:03','2025-09-30 22:37:03'),(32,'67100784','2025-09-30 22:39:21','2025-09-30 23:39:21');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-30 22:59:43
