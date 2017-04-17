<?php 

	require 'db_config.php';

	/**
		start database connection
	**/

	function connect_db()
	{
		$link = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
		if(mysqli_errno($link))
		{
			die("Can't connect to database error: " . mysqli_error($link));
		}
		return $link;
	}

	// close connection
	function closeConnection($link)
	{
		mysqli_close($link);
	}
?>






