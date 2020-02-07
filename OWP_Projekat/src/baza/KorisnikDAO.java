package baza;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import model.Korisnik;
import model.TipKorisnika;

public class KorisnikDAO {

	public static List<Korisnik> getAll() {
		List<Korisnik> korisnici = new ArrayList<>();

		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT korime, lozinka, datumRegistracije, uloga, aktivan "
					+ "FROM korisnici WHERE aktivan = 1";

			pstmt = conn.prepareStatement(query);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				int index = 1;
				String korime = rset.getString(index++);
				String lozinka = rset.getString(index++);
				String datumRegistracije = rset.getString(index++);
				TipKorisnika uloga = TipKorisnika.valueOf(rset.getString(index++));
				boolean aktivan = rset.getBoolean(index++);

				Korisnik kor = new Korisnik(korime, lozinka, datumRegistracije, uloga, aktivan);

				korisnici.add(kor);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {
				pstmt.close();
			} catch (Exception ex1) {
				ex1.printStackTrace();
			}
			try {
				rset.close();
			} catch (Exception ex1) {
				ex1.printStackTrace();
			}
			try {
				conn.close();
			} catch (Exception ex1) {
				ex1.printStackTrace();
			}
		}

		return korisnici;
	}
	
	public static Korisnik get(String korime, String password) throws Exception {
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();
		
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {

			String query = "SELECT datumRegistracije, uloga, aktivan FROM korisnici WHERE korime = ? AND lozinka = ? AND aktivan = 1";
			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, korime);
			pstmt.setString(index++, password);
			rset = pstmt.executeQuery();

			if (rset.next()) {
				index = 1;
				String datumRegistracije = rset.getString(index++);
				TipKorisnika uloga = TipKorisnika.valueOf(rset.getString(index++));
				boolean aktivan = rset.getBoolean(index++);

				return new Korisnik(korime, password, datumRegistracije, uloga, aktivan);
			}
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return null;
	}
	
	public static Korisnik get(String korime) {

		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();
		
		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT korime, lozinka, datumRegistracije, uloga, aktivan FROM korisnici WHERE korime = ?";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, korime);

			rset = pstmt.executeQuery();

			if (rset.next()) {
				index = 2;
				String lozinka = rset.getString(index++);
				String datumRegistracije = rset.getString(index++);
				TipKorisnika uloga = TipKorisnika.valueOf(rset.getString(index++));
				boolean aktivan = rset.getBoolean(index++);

				return new Korisnik(korime, lozinka, datumRegistracije, uloga, aktivan);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return null;
	}
	
	public static boolean add(Korisnik korisnik) {
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		try {
			String query = "INSERT INTO korisnici (korime, lozinka, datumRegistracije, uloga, aktivan) "
					+ "VALUES (?, ?, ?, ?, ?)";

			pstmt = conn.prepareStatement(query);
			int index = 1;

			pstmt.setString(index++, korisnik.getKorime());
			pstmt.setString(index++, korisnik.getLozinka());
			pstmt.setString(index++, korisnik.getDatumRegistracije());
			pstmt.setString(index++, korisnik.getUloga().toString());
			pstmt.setBoolean(index++, korisnik.isAktivan());

			return pstmt.executeUpdate() == 1;
			
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return false;
	}
	
	public static boolean izmenaKorisnika(Korisnik korisnik) {
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		try {
			String query = "UPDATE korisnici SET lozinka = ?, uloga = ? WHERE korime = ?";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, korisnik.getLozinka());
			pstmt.setString(index++, korisnik.getUloga().toString());
			pstmt.setString(index++, korisnik.getKorime());

			return pstmt.executeUpdate() == 1;
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return false;
	}
	
	public static boolean brisanjeKorisnika(String korime) {
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		try {
			String query = "DELETE FROM korisnici WHERE korime = ?";

			int index = 1;
			pstmt = conn.prepareStatement(query);
			pstmt.setString(index++, korime);

			return pstmt.executeUpdate() == 1;
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return false;
	}
	
	public static boolean logickoBrisanjeKorisnika(String korime) {
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		try {
			String query = "UPDATE korisnici SET aktivan = 0 WHERE korime = ? AND korime IN (SELECT korisnik FROM karte)";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, korime);

			return pstmt.executeUpdate() == 1;
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}

		return false;
	}
	
	public static List<Korisnik> getKorime(String korime) {
		List<Korisnik> korisnici = new ArrayList<>();
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT korime, lozinka, datumRegistracije, uloga, aktivan FROM "
					+ "korisnici WHERE korime LIKE ? and aktivan = 1";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, "%" + korime + "%");

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
				String korisnicko = rset.getString(index++);
				String lozinka = rset.getString(index++);
				String datumRegistracije = rset.getString(index++);
				TipKorisnika uloga = TipKorisnika.valueOf(rset.getString(index++));
				boolean aktivan = rset.getBoolean(index++);

				Korisnik korisnik = new Korisnik(korisnicko, lozinka, datumRegistracije, uloga, aktivan);
				
				korisnici.add(korisnik);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}
		
		return korisnici;
	}
	
	public static List<Korisnik> getUloge(String uloga) {
		List<Korisnik> korisnici = new ArrayList<>();
		
		ConnectionManager.open();
		
		Connection conn = ConnectionManager.getConnection();

		PreparedStatement pstmt = null;
		ResultSet rset = null;
		try {
			String query = "SELECT korime, lozinka, datumRegistracije, uloga, aktivan FROM "
					+ "korisnici WHERE uloga = ? and aktivan = 1";

			pstmt = conn.prepareStatement(query);
			int index = 1;
			pstmt.setString(index++, uloga);

			rset = pstmt.executeQuery();

			while (rset.next()) {
				index = 1;
				String korime = rset.getString(index++);
				String lozinka = rset.getString(index++);
				String datumRegistracije = rset.getString(index++);
				TipKorisnika ulogaK = TipKorisnika.valueOf(rset.getString(index++));
				boolean aktivan = rset.getBoolean(index++);

				Korisnik korisnik = new Korisnik(korime, lozinka, datumRegistracije, ulogaK, aktivan);
				
				korisnici.add(korisnik);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			try {pstmt.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {rset.close();} catch (Exception ex1) {ex1.printStackTrace();}
			try {conn.close();} catch (Exception ex1) {ex1.printStackTrace();}
		}
		
		return korisnici;
	}
	
}
