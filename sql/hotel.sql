-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 08, 2017 at 07:17 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(3) NOT NULL,
  `name` varchar(25) NOT NULL,
  `address` text NOT NULL,
  `cost` int(11) NOT NULL,
  `rat_avg` float DEFAULT '0',
  `rat_sum` int(11) DEFAULT '0',
  `rat_no` int(11) DEFAULT '0',
  `contact` varchar(20) NOT NULL,
  `pic` varchar(255) NOT NULL,
  `check` int(11) DEFAULT '0',
  `available` int(11) NOT NULL,
  `reserved` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `name`, `address`, `cost`, `rat_avg`, `rat_sum`, `rat_no`, `contact`, `pic`, `check`, `available`, `reserved`) VALUES
(1, 'The Grand Hyatt', 'Santacruz, Mumbai, Maharashtra', 7600, 4.5, 6019, 1368, '02266761234', 'images/DSC_1177.JPG', 0, 75, 0),
(2, 'JW Marriott Mumbai', 'Juhu, Mumbai, Maharashtra', 11400, 4.5, 6345, 1410, ' 02266933000', '', 0, 60, 0),
(3, 'The Taj Mahal Palace', 'Colaba, Mumbai, Maharashtra', 12000, 4.5, 12223, 2778, '02266653366', '', 0, 50, 0),
(4, 'Sofitel Mumbai BKC', 'Bandra, Mumbai, Maharashtra', 7800, 4.5, 3450, 784, '02261175000', '', 0, 45, 0),
(5, 'Vivanta by Taj-President', 'Cuffe Parade, Mumbai, Maharashtra', 9000, 4.5, 2957, 672, '02266650808', '', 0, 75, 0),
(6, 'Trident Hotel Bandra ', 'Bandra, Mumbai, Maharashtra', 8000, 4.5, 3177, 706, '02266727777', '', 0, 60, 0),
(7, 'The Grand Bhagwati', 'Magdalla Circle, Dumas Road, Surat, Gujarat', 5700, 4.4, 1458, 339, '02612309000', '', 0, 75, 0),
(8, 'The Best Western Surat', 'Railway Station Area, Surat, Gujarat', 2500, 4, 433, 111, '02616505471', '', 0, 45, 0),
(9, 'Lords Plaza', 'Ring Road, Delhi Gate, Surat, Gujarat', 2700, 4, 800, 200, '02612418300', '', 0, 50, 0),
(10, 'The Gateway Hotel', 'Dumas Road, Athwalines, Surat, Gujarat', 7535, 4.5, 2125, 483, '02616697000', '', 0, 60, 0),
(11, 'Ginger Hotel', 'Dumas Road, Piplod, Surat, Gujarat', 3765, 3.8, 737, 194, '02616666333', '', 0, 75, 0),
(12, 'Vivanta by Taj', 'Sinquerim, Candolim, Bardez, Goa', 9661, 4.5, 1725, 392, '08326645858', '', 0, 45, 0),
(13, 'DoubleTree by Hilton Hote', 'Ximer, Arpora, Goa', 6854, 4.3, 836, 199, '08326655666', '', 0, 75, 0),
(14, 'The Leela Goa', 'Mobor, Salcette, Cavelossim, Goa', 14706, 4.6, 1458, 317, '08326621234', '', 0, 60, 0),
(15, 'Grand Hyatt Goa', 'P.O. Goa University, Bambolim, Goa', 11512, 4.6, 2498, 555, '08323011234', '', 0, 50, 0),
(16, 'Sheraton Grand Hotel', 'Rajaji Nagar, Bengaluru, Karnataka', 9180, 4.6, 2615, 581, '08042521000', '', 0, 45, 0),
(17, 'Movenpick Hotel Bangalore', 'Mathikere Extension, Mathikere, Bengaluru, Karnataka', 7000, 4.2, 1747, 416, '08043001000', '', 0, 75, 0),
(18, 'Ramada Bangalore', 'Shivaji Nagar, Bengaluru, Karnataka', 3781, 3.7, 814, 226, '08022865566', '', 0, 60, 0);

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `rv_id` int(11) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `hot_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `rev_id` int(11) NOT NULL,
  `review` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`hot_id`, `u_id`, `rev_id`, `review`) VALUES
(5, 0, 1, 'hey'),
(5, 0, 2, 'hey'),
(5, 0, 3, 'hi'),
(5, 0, 4, 'hello'),
(5, 0, 5, 'hello'),
(5, 0, 6, 'hello');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `u_id` int(11) NOT NULL,
  `u_name` varchar(10) NOT NULL,
  `u_pass` varchar(50) NOT NULL,
  `u_email` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`u_id`, `u_name`, `u_pass`, `u_email`) VALUES
(1, 'aabha', '766c32f42272064af1740dd974e3e47e', 'mathews.abby96@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`rv_id`),
  ADD KEY `rest_id` (`hotel_id`),
  ADD KEY `u_id` (`u_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`rev_id`),
  ADD KEY `rest_id` (`hot_id`),
  ADD KEY `u_id` (`u_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `u_email` (`u_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `rv_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `rev_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
