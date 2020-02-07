package aplikacija;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import baza.KorisnikDAO;
import model.Korisnik;

public class UpravljanjeKorisnicimaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String prijavljenKorisnikKorime = (String) request.getSession().getAttribute("prijavljenKorisnik");
		if (prijavljenKorisnikKorime == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		Korisnik prijavljenKorisnik = KorisnikDAO.getPrijavljen(prijavljenKorisnikKorime);
		if (prijavljenKorisnik == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		
		if(prijavljenKorisnik.getUloga().name().equals("KORISNIK")) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		
		String korimePretraga = request.getParameter("korimePretraga");
		String ulogaKorisnikaPretraga = request.getParameter("ulogaKorisnikaPretraga");
		
		List<Korisnik> korisnici = KorisnikDAO.getAll();
		List<Korisnik> korimenaPretraga = KorisnikDAO.getKorime(korimePretraga);
		List<Korisnik> ulogePretraga = KorisnikDAO.getUloge(ulogaKorisnikaPretraga);
		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("korisnici", korisnici);
		data.put("korimenaPretraga", korimenaPretraga);
		data.put("ulogaKorisnikaPretraga", ulogePretraga);
		data.put("prijavljenKorisnikKorime", prijavljenKorisnikKorime);
		
		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
